// import { keyword } from '@/services/api/keyword';
import { RightOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import RuleForm from './RuleForm';

const TableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef1 = useRef<ActionType>();
  const actionRef2 = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<any>();
  const [ruleModalVisible, setRuleModalVisible] = useState(false);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<any>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchKeywords.updateForm.keyword.nameLabel"
          defaultMessage="关键词"
        />
      ),
      dataIndex: 'keyword',
      align: 'center',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchKeywords.updateForm.customerAmount.nameLabel"
          defaultMessage="搜索指数"
        />
      ),
      dataIndex: 'search_index',
      align: 'center',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchKeywords.updateForm.customerAmount.nameLabel"
          defaultMessage="价格"
        />
      ),
      dataIndex: 'price',
      align: 'center',
      valueType: 'textarea',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<any, API.PageParams>
        style={{
          paddingBottom: 20,
        }}
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: '关键词结果',
        })}
        actionRef={actionRef1}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Button
          //   // type="primary"
          //   key="primary"
          //   onClick={() => {
          //     // setCreateModalVisible(true);
          //   }}
          // >
          //   查看规则 <RightOutlined />
          // </Button>,
        ]}
        request={async (_params: any, sorter: { createTime?: any }) => {
          try {
            return {
              data: [],
              success: true,
              total: 0,
            };
          } catch (err) {
            message.error('网络错误');
            return {
              data: [],
              success: true,
              total: 0,
            };
          }
        }}
        columns={columns}
      />
      <RuleForm
        updateModalVisible={ruleModalVisible}
        onVisibleChange={setRuleModalVisible}
      />
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.keyword && (
          <ProDescriptions<any>
            column={2}
            title={currentRow.keyword}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow.keyword,
            }}
            columns={columns as ProDescriptionsItemProps<any>[]}
          />
        )}
      </Drawer>
      {/* <h3>{'相关词'}</h3> */}
      {/* <ProTable<any, API.PageParams>
        headerTitle={
          <strong>
            {intl.formatMessage({
              id: 'pages.searchTable.title',
              defaultMessage: '相关词',
            })}
          </strong>
        }
        actionRef={actionRef2}
        rowKey="key"
        search={false}
        // toolBarRender={false}
        // toolBarRender={() => [
        //   // <Button
        //   //   type="primary"
        //   //   key="primary"
        //   //   onClick={() => {
        //   //     setCreateModalVisible(true);
        //   //   }}
        //   // >
        //   //   <PlusOutlined /> 新 增
        //   // </Button>,
        // ]}
        // request={keyword}
        columns={columns}
      /> */}
      <a
        style={{ width: '100%', display: 'flex', textAlign: 'center', justifyContent: 'center' }}
        onClick={() => {
          setRuleModalVisible(true);
        }}
      >
        查看规则
        <RightOutlined />
      </a>
    </PageContainer>
  );
};

export default TableList;
