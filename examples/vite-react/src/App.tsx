import React, { useState } from 'react';
import { Select, Tag, Space, Typography } from 'antd';
import { DirectionEnum, DirectionOptionList } from './enum'
import type { DirectionValue } from './enum'

const EnhancedSelectDemo: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<DirectionValue>();

  return (
    <div style={{ maxWidth: 680, margin: 40 }}>
      {/* 主选择器 */}
      <Select<DirectionValue>
        style={{ width: 240 }}
        options={DirectionOptionList}
        placeholder={`选择方向（共 ${DirectionEnum.$length} 项）`}
        onChange={value => setSelectedValue(value)}
        showSearch
      />

      {/* 选中状态展示 */}
      {selectedValue && (
        <Space style={{ margin: '16px 0' }}>
          <Tag color="blue">
            {DirectionEnum.$getKey(selectedValue)} → 
            {DirectionOptionList.find(o => o.value === selectedValue)?.label} → 
            <code>{selectedValue}</code>
          </Tag>
        </Space>
      )}

      {/* 实时数据视图 */}
      <Typography.Title level={5} style={{ marginTop: 24 }}>
        当前枚举结构（{DirectionEnum.$length} 项）
      </Typography.Title>
      <ul>
        {DirectionEnum.$getKeys().map(key => (
          <li key={key}>
            <code>{key}</code> → 
            <Tag>{DirectionEnum.$getValue(key)}</Tag> → 
            {DirectionOptionList.find(o => o.value === DirectionEnum.$getValue(key))?.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnhancedSelectDemo;
