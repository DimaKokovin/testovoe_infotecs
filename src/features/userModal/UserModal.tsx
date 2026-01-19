import { Modal, Input, Form, Button } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export interface IUser {
    id?: string;
    name: string;
    avatar: string;
    createdAt: string;
}

interface Props {
    open: boolean;
    onCancel: () => void;
    user?: IUser | null;
}

const API_URL = "https://696e4c6ed7bacd2dd71660e1.mockapi.io/users";

export const UserModal = ({ open, onCancel, user }: Props) => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const isEdit = Boolean(user);

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        } else {
            form.resetFields();
        }
    }, [user, form]);

    const mutation = useMutation({
        mutationFn: async (values: IUser) => {
            if (isEdit && user?.id) {
                return axios.put(`${API_URL}/${user.id}`, values);
            }
            return axios.post(API_URL, values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            onCancel();
        },
    });

    const handleFinish = (values: IUser) => {
        mutation.mutate(values);
    };

    return (
        <Modal
            open={open}
            title={isEdit ? "Редактирование пользователя" : "Создание пользователя"}
            onCancel={mutation.isPending ? undefined : onCancel}
            footer={null}
            closable={!mutation.isPending}
            maskClosable={false}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                {isEdit && (
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>
                )}

                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[{ required: true, message: "Введите имя" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ссылка на аватарку"
                    name="avatar"
                    rules={[
                        { required: true, message: "Введите ссылку" },
                        { type: "url", message: "Некорректная ссылка" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={onCancel} disabled={mutation.isPending}>
                        Отмена
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={mutation.isPending}
                        style={{ marginLeft: 8 }}
                    >
                        {isEdit ? "Сохранить" : "Создать"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
