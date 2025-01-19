import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyMetrics = () => {
  const data = [
    { month: '1月', packages: 1137, products: 1305, returns: 985, exchanges: 40, repairs: 280 },
    { month: '2月', packages: 509, products: 673, returns: 487, exchanges: 29, repairs: 157 },
    { month: '3月', packages: 1288, products: 1564, returns: 1443, exchanges: 50, repairs: 371 },
    { month: '4月', packages: 1335, products: 1703, returns: 1052, exchanges: 54, repairs: 385 },
    { month: '5月', packages: 1084, products: 1309, returns: 912, exchanges: 70, repairs: 327 },
    { month: '6月', packages: 1434, products: 1651, returns: 1264, exchanges: 88, repairs: 263 },
    { month: '7月', packages: 1828, products: 2176, returns: 1362, exchanges: 68, repairs: 403 },
    { month: '8月', packages: 1112, products: 1333, returns: 1018, exchanges: 36, repairs: 268 },
    { month: '9月', packages: 970, products: 1141, returns: 836, exchanges: 26, repairs: 279 },
    { month: '10月', packages: 1314, products: 1643, returns: 1209, exchanges: 60, repairs: 374 },
    { month: '11月', packages: 1704, products: 2023, returns: 1550, exchanges: 135, repairs: 338 },
    { month: '12月', packages: 1225, products: 1516, returns: 1103, exchanges: 91, repairs: 322 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip" style={{ backgroundColor: 'white', padding: '16px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, fontSize: '14px' }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
      <div style={{ height: '500px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month"
              label={{ value: '月份', position: 'bottom', offset: 0 }}
            />
            <YAxis 
              yAxisId="left"
              label={{ value: '主要指标数量', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              domain={[0, 500]}
              label={{ value: '换货/维修数量', angle: 90, position: 'insideRight' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            
            {/* 主要指标使用柱状图 */}
            <Bar 
              yAxisId="left"
              dataKey="products" 
              name="产品件数" 
              fill="#4f46e5" 
              stackId="a"
              opacity={0.8}
            />
            <Bar 
              yAxisId="left"
              dataKey="packages" 
              name="包裹数量" 
              fill="#10b981" 
              stackId="b"
              opacity={0.8}
            />
            <Bar 
              yAxisId="left"
              dataKey="returns" 
              name="退货数量" 
              fill="#f59e0b" 
              stackId="c"
              opacity={0.8}
            />
            
            {/* 次要指标使用折线图 */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="repairs"
              name="维修数量"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="exchanges"
              name="换货数量"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyMetrics;
