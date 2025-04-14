"use client"

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSupabaseAuth } from "@/lib/supabase-auth";
import supabase from "@/lib/supabase";
import { format, subDays } from 'date-fns';

type ShippingMethod = {
  name: string;
  domestic: number;
  international: number;
  express: number;
};

export function ShippingStats() {
  const { user } = useSupabaseAuth();
  const [data, setData] = useState<ShippingMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShippingStats() {
      if (!user) return;

      try {
        setLoading(true);
        
        // Get last 4 weeks of data
        const fourWeeksAgo = subDays(new Date(), 28);
        
        const { data, error } = await supabase
          .from('shipments')
          .select('created_at, shipping_method, destination')
          .eq('user_id', user.id)
          .gte('created_at', fourWeeksAgo.toISOString());

        if (error) {
          console.error('Error fetching shipping stats:', error);
          return;
        }

        // Process data into weekly statistics
        const weeklyData: ShippingMethod[] = [];
        
        for (let i = 0; i < 4; i++) {
          const weekStart = subDays(new Date(), 28 - (i * 7));
          const weekEnd = subDays(new Date(), 28 - ((i + 1) * 7) + 1);
          
          const weekShipments = data.filter(shipment => {
            const shipmentDate = new Date(shipment.created_at);
            return shipmentDate >= weekStart && shipmentDate < weekEnd;
          });
          
          const domestic = weekShipments.filter(s => !s.destination.includes(",") || 
            s.destination.split(",")[1]?.trim() === "USA" || 
            s.destination.split(",")[1]?.trim() === "US").length;
            
          const international = weekShipments.filter(s => 
            s.destination.includes(",") && 
            s.destination.split(",")[1]?.trim() !== "USA" && 
            s.destination.split(",")[1]?.trim() !== "US").length;
            
          const express = weekShipments.filter(s => 
            s.shipping_method === "Express" || 
            s.shipping_method === "Priority").length;
          
          weeklyData.push({
            name: `Week ${i + 1}`,
            domestic,
            international,
            express
          });
        }
        
        setData(weeklyData);
      } catch (error) {
        console.error('Exception fetching shipping stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchShippingStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center h-[300px] items-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-sm" />
          <YAxis className="text-sm" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))', 
              border: '1px solid hsl(var(--border))' 
            }}
          />
          <Line 
            type="monotone" 
            dataKey="domestic" 
            stroke="hsl(var(--primary))" 
            activeDot={{ r: 8 }} 
            strokeWidth={2} 
          />
          <Line 
            type="monotone" 
            dataKey="international" 
            stroke="hsl(var(--secondary))" 
            strokeWidth={2} 
          />
          <Line 
            type="monotone" 
            dataKey="express" 
            stroke="hsl(var(--accent))" 
            strokeDasharray="5 5"
            strokeWidth={2} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 