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

  return (
    <>
      <ModalForm
        title="修改信息"
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
      ></ModalForm>
    </>
  );
};

// export default UpdateForm;
export default RuleForm;
