import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart
} from 'recharts';

const MaintenanceDualView = () => {
  // 内部维修数据
  const internalData = [
    { month: '1月', packages: 270, products: 403 },
    { month: '2月', packages: 108, products: 172 },
    { month: '3月', packages: 270, products: 418 },
    { month: '4月', packages: 363, products: 573 },
    { month: '5月', packages: 298, products: 473 },
    { month: '6月', packages: 311, products: 442 },
    { month: '7月', packages: 369, products: 531 },
    { month: '8月', packages: 228, products: 338 },
    { month: '9月', packages: 256, products: 360 },
    { month: '10月', packages: 232, products: 364 },
    { month: '11月', packages: 361, products: 519 },
    { month: '12月', packages: 316, products: 496 }
  ];

  // 返厂维修数据
  const returnData = [
    { month: '1月', returns: 462, secondary: 0 },
    { month: '2月', returns: 193, secondary: 0 },
    { month: '3月', returns: 505, secondary: 63 },
    { month: '4月', returns: 628, secondary: 81 },
    { month: '5月', returns: 514, secondary: 51 },
    { month: '6月', returns: 450, secondary: 36 },
    { month: '7月', returns: 522, secondary: 17 },
    { month: '8月', returns: 438, secondary: 36 },
    { month: '9月', returns: 384, secondary: 32 },
    { month: '10月', returns: 507, secondary: 40 },
    { month: '11月', returns: 578, secondary: 18 },
    { month: '12月', returns: 517, secondary: 33 }
  ];

  const supplierInfo = {
    '1月': { suppliers: '聚福155件、启瑞274件、诚美15件、万寸集15件、湖科1件、苏艺轩1件', secondarySuppliers: '当时未统计' },
    '2月': { suppliers: '聚福76件、启瑞105件、诚美8件、万寸集3件、柏星1件', secondarySuppliers: '当时未统计' },
    '3月': { suppliers: '聚福137件、万寸集8件、启瑞348件、诚美、苏艺、湖科、华超星12件', secondarySuppliers: '万寸集1件、聚福5件、启瑞57件' },
    '4月': { suppliers: '共计628件、刘郭209件、启瑞385件、万寸集17件、诚美13件、柏康、苏艺轩、帝亿、华超星14件', secondarySuppliers: '启瑞75件、聚福4件、万寸集2件' },
    '5月': { suppliers: '聚福141件、启瑞325件、万寸集10件、诚美27件、柏康、苏艺轩、帝亿、骏汇、卓汇、吉尔德、小锦鲤、盛程共11件', secondarySuppliers: '聚福9件、启瑞42件、诚美5件' },
    '6月': { suppliers: '聚福174件、启瑞258件、万寸集5件、诚美6件、苏艺轩2件、钰音、汐晨、华超星、小评、黄小仙共5件', secondarySuppliers: '聚福10件、启瑞25件、万寸集1件' },
    '7月': { suppliers: '总计522件、聚福165件、启瑞289件、诚美27件、平家1件、万寸集3件、柏音5件、湖科24件、汐晨2件、苏艺轩4件、黄小仙2件', secondarySuppliers: '启瑞6件、聚福10件、汐晨1件' },
    '8月': { suppliers: '聚福134件、启瑞265件、万寸集2件、诚美18件、黄小仙4件、湖科10件、骏航3件、钰音1件、南雅1件', secondarySuppliers: '聚福8件、启瑞27件、黄小仙1件' },
    '9月': { suppliers: '聚福128件、启瑞203件、诚美34件、万寸集6件、苏艺轩5件、柏音2件、金坚2件、湖科2级、黄小仙1件、南生1件', secondarySuppliers: '启瑞19件、聚福13件、诚美2件' },
    '10月': { suppliers: '聚福141件、启瑞320件、诚美17件、金坚5件、黄小仙1件、万寸集14件、湖科3件、吉尔德1件、科3件、王工1件、柏音1件', secondarySuppliers: '启瑞31件、聚福8件、诚美1件' },
    '11月': { suppliers: '聚福166件、启瑞368件、万寸集11件、诚美16件、启科3件、黄小仙2件、金坚2件、湖科1件、苏艺轩4件、柏音1件、宇家1件、传杭珠宝1件、吉尔德1件', secondarySuppliers: '启瑞14件、聚福2件' },
    '12月': { suppliers: '聚福189件、启瑞278件、诚美9件、万寸集16件、苏艺轩3件、柏音4件、华超星1件、小锦鲤1件、宇家1件、店科7件、湖科8件', secondarySuppliers: '启瑞22件、聚福10件、宇家1件、万寸集1件' }
  };

  const CustomTooltip = ({ active, payload, label, showSuppliers = false }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '16px', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, margin: '4px 0' }}>
              {entry.name}: {entry.value}
            </p>
          ))}
          {showSuppliers && supplierInfo[label] && (
            <>
              <p style={{ marginTop: '8px', color: '#666', fontSize: '14px' }}>返厂供应商分布:</p>
              <p style={{ fontSize: '14px' }}>{supplierInfo[label].suppliers}</p>
              {returnData.find(d => d.month === label).secondary > 0 && (
                <>
                  <p style={{ marginTop: '8px', color: '#666', fontSize: '14px' }}>二次返厂供应商:</p>
                  <p style={{ fontSize: '14px' }}>{supplierInfo[label].secondarySuppliers}</p>
                </>
              )}
            </>
          )}
        </div>
      );
    }
    return null;
  };

  const containerStyle = {
    margin: '32px 0',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: 'white'
  };

  const chartContainerStyle = {
    height: '400px',
    marginBottom: '20px'
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginTop: '16px'
  };

  const statBoxStyle = (color) => ({
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: `${color}10`,
    border: `1px solid ${color}30`
  });

  return (
    <div style={{ padding: '16px' }}>
      {/* 内部维修数据视图 */}
      <div style={containerStyle}>
        <h2 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>内部维修数据分析</h2>
        <div style={chartContainerStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={internalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="packages" name="维修发货包裹" fill="#2563eb" />
              <Bar dataKey="products" name="维修产品数量" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={statsContainerStyle}>
          <div style={statBoxStyle('#2563eb')}>
            <h3 style={{ color: '#1e40af', fontWeight: 600, marginBottom: '8px' }}>发货包裹统计</h3>
            <p>年总量: {internalData.reduce((sum, item) => sum + item.packages, 0)}</p>
            <p>月平均: {Math.round(internalData.reduce((sum, item) => sum + item.packages, 0) / 12)}</p>
          </div>
          <div style={statBoxStyle('#16a34a')}>
            <h3 style={{ color: '#166534', fontWeight: 600, marginBottom: '8px' }}>维修产品统计</h3>
            <p>年总量: {internalData.reduce((sum, item) => sum + item.products, 0)}</p>
            <p>月平均: {Math.round(internalData.reduce((sum, item) => sum + item.products, 0) / 12)}</p>
          </div>
        </div>
      </div>

      {/* 返厂维修数据视图 */}
      <div style={containerStyle}>
        <h2 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>返厂维修数据分析</h2>
        <div style={chartContainerStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={returnData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={(props) => <CustomTooltip {...props} showSuppliers={true} />} />
              <Legend />
              <Bar dataKey="returns" name="返厂维修数量" fill="#9333ea" />
              <Line type="monotone" dataKey="secondary" name="二次返厂数量" stroke="#ea580c" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div style={statsContainerStyle}>
          <div style={statBoxStyle('#9333ea')}>
            <h3 style={{ color: '#6b21a8', fontWeight: 600, marginBottom: '8px' }}>返厂维修统计</h3>
            <p>年总量: {returnData.reduce((sum, item) => sum + item.returns, 0)}</p>
            <p>月平均: {Math.round(returnData.reduce((sum, item) => sum + item.returns, 0) / 12)}</p>
          </div>
          <div style={statBoxStyle('#ea580c')}>
            <h3 style={{ color: '#9a3412', fontWeight: 600, marginBottom: '8px' }}>二次返厂统计</h3>
            <p>年总量: {returnData.reduce((sum, item) => sum + item.secondary, 0)}</p>
            <p>月平均: {Math.round(returnData.reduce((sum, item) => sum + item.secondary, 0) / 12)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDualView;
