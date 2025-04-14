-- Update shipments table to include cost field if it doesn't exist already
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'shipments' 
    AND column_name = 'cost'
  ) THEN
    ALTER TABLE shipments ADD COLUMN cost DECIMAL(10, 2);
  END IF;
END
$$;

-- Create a more detailed view for recent shipments
CREATE OR REPLACE VIEW recent_shipments AS
SELECT 
  s.id,
  s.tracking_number,
  s.user_id,
  s.status,
  s.origin,
  s.destination,
  s.shipping_method,
  s.weight,
  s.dimensions,
  s.cost,
  s.created_at,
  s.estimated_delivery,
  s.actual_delivery,
  p.first_name || ' ' || p.last_name AS customer_name
FROM 
  shipments s
JOIN 
  profiles p ON s.user_id = p.id
ORDER BY 
  s.created_at DESC;

-- Make sure RLS is applied to the view too
ALTER VIEW recent_shipments SECURITY INVOKER;

-- Create a function to get shipment statistics for a user
CREATE OR REPLACE FUNCTION get_shipment_stats(user_uuid UUID)
RETURNS TABLE (
  active_shipments BIGINT,
  delivered_shipments BIGINT,
  total_spent DECIMAL(10, 2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM shipments WHERE user_id = user_uuid AND status IN ('Processing', 'In Transit')),
    (SELECT COUNT(*) FROM shipments WHERE user_id = user_uuid AND status = 'Delivered' AND actual_delivery >= NOW() - INTERVAL '30 days'),
    (SELECT COALESCE(SUM(cost), 0.00) FROM shipments WHERE user_id = user_uuid AND created_at >= NOW() - INTERVAL '30 days');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS policy for the function 
REVOKE ALL ON FUNCTION get_shipment_stats FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_shipment_stats TO authenticated;
