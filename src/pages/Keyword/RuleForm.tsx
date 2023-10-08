import React, { useEffect, useState } from 'react';
import { DeleteOutlined, PlusOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormGroup,
  ProFormItem,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Image, message, Spin, Tag, Upload, UploadFile } from 'antd';

export type UpdateFormProps = {
  updateModalVisible: boolean;
  onVisibleChange: (flag: boolean) => void;
};

const RuleForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, onVisibleChange = () => {} } = props;
  const columns: any[] = [
    {
      title: '抖音指数',
      dataIndex: 'douyin_index',
      width: 150,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: 150,
      align: 'center',
      hideInSearch: true,
    },
  ];
  const dataSource: any[] = [
    { douyin_index: '0-500', price: '9800套餐' },
    { douyin_index: '500-1000', price: '60元/天/词' },
    { douyin_index: '1000-2000', price: '80元/天/词' },
    { douyin_index: '2000-5000', price: '100元/天/词' },
    { douyin_index: '5000-10000', price: '120元/天/词' },
    { douyin_index: '10000以上', price: '200元/天/词' },
  ];
  return (
    <>
      <ModalForm
        // title="关键词指数和价格规则"
        // width="90%"
        // initialValues={data}
        syncToInitialValues
        open={updateModalVisible}
        onOpenChange={onVisibleChange}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {},
          afterClose: () => {},
        }}
        submitter={false}
        // submitter={{
        //   submitButtonProps: {
        //     style: {
        //       display: isEdit ? 'block' : 'none',
        //     },
        //   },
        //   render: (props, defaultDoms) => {
        //     return [
        //       ...defaultDoms,
        //       <Button
        //         key="modified"
        //         onClick={() => {
        //           // props.submit();
        //           setIsEdit(true);
        //         }}
        //       >
        //         修改
        //       </Button>,
        //     ];
        //   },
        // }}
        onFinish={async (value: any) => {}}
      >
        <strong style={{ fontSize: '20px', textAlign: 'center', width: '100%', display: 'block' }}>
          关键词指数和价格规则
        </strong>
        <ProTable
          style={{ padding: '30px 100px' }}
          columns={columns}
          // headerTitle={<strong>长尾词</strong>}
          search={false}
          toolBarRender={false}
          pagination={false}
          dataSource={dataSource}
        />
        <strong style={{ fontSize: '16px' }}>不能做的行业</strong>
        <p>
          <strong>1.金融：</strong>股票，期货、理财、大额贷款，区块链等。
        </p>
        <p>
          <strong>2.医疗整形：</strong>男科、妇科、代孕、药品、亲子鉴定等。
        </p>
        <p>
          <strong>3.假货：</strong>高仿鞋，手表、高仿包、刻章等。
        </p>
        <p>
          <strong>4.涉及黄赌毒行业：</strong>spa、透视、博彩、足球、私人模特、极品伴游 、租赁女友
          、私人伴游师 、私人陪游等。
        </p>
        <p>
          <strong>5.易侵权行业：</strong>小说。
        </p>
        <p>
          <strong>6.政府相关：</strong>军用器械、警用设备、政府工程等。
        </p>
        <p>
          <strong>7.服务行业：</strong>删帖公司、 刷单、 代写论文、代开发票、微信加粉软件等。
        </p>
        <p>
          <strong>8.实体行业：</strong>
          GPS信号、手机屏蔽仪、烟草、食盐、烟花爆竹、管制刀具、信号接收器，电视棒、文物拍卖
          、古董拍卖、汽车解码器、万能钥匙等。
        </p>
      </ModalForm>
    </>
  );
};

// export default UpdateForm;
export default RuleForm;
