import supabase from './supabase';

// Define types for shipment data
export type ShipmentStats = {
  activeShipments: number;
  deliveredShipments: number;
  totalSpent: number;
};

/**
 * Get shipment statistics for the current user
 * @param userId The ID of the current user
 * @returns Statistics about active shipments, delivered shipments, and total spent
 */
export async function getShipmentStats(userId: string): Promise<ShipmentStats> {
  try {
    // Use the stored function we created in the database
    const { data, error } = await supabase
      .rpc('get_shipment_stats', { user_uuid: userId });

    if (error) {
      console.error('Error fetching shipment stats:', error);
      throw error;
    }

    // If no data or data is empty array, return default values
    if (!data || data.length === 0) {
      return {
        activeShipments: 0,
        deliveredShipments: 0,
        totalSpent: 0
      };
    }

    return {
      activeShipments: data[0].active_shipments,
      deliveredShipments: data[0].delivered_shipments,
      totalSpent: data[0].total_spent
    };
  } catch (error) {
    console.error('Exception fetching shipment stats:', error);
    
    // Return default values on error
    return {
      activeShipments: 0,
      deliveredShipments: 0,
      totalSpent: 0
    };
  }
}

/**
 * Manual alternative when RPC function isn't available
 */
export async function getShipmentStatsManual(userId: string): Promise<ShipmentStats> {
  try {
    // Get active shipments count (in transit or processing)
    const { data: activeData, error: activeError } = await supabase
      .from('shipments')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .in('status', ['Processing', 'In Transit']);

    if (activeError) {
      console.error('Error fetching active shipments:', activeError);
      throw activeError;
    }

    // Get delivered shipments in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: deliveredData, error: deliveredError } = await supabase
      .from('shipments')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('status', 'Delivered')
      .gte('actual_delivery', thirtyDaysAgo.toISOString());

    if (deliveredError) {
      console.error('Error fetching delivered shipments:', deliveredError);
      throw deliveredError;
    }

    // Get total spent in last 30 days
    const { data: spentData, error: spentError } = await supabase
      .from('shipments')
      .select('cost')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (spentError) {
      console.error('Error fetching cost data:', spentError);
      throw spentError;
    }

    // Calculate total spent
    const totalSpent = spentData.reduce((sum, shipment) => sum + (shipment.cost || 0), 0);

    return {
      activeShipments: activeData.length,
      deliveredShipments: deliveredData.length,
      totalSpent
    };
  } catch (error) {
    console.error('Exception in manual shipment stats calculation:', error);
    
    // Return default values on error
    return {
      activeShipments: 0,
      deliveredShipments: 0,
      totalSpent: 0
    };
  }
}
