import { FileRoute } from '@tanstack/react-router';
import { Create } from '@components/crud/create';
import { Field, Form } from 'houseform';
import {
  Badge,
  Text,
  Button,
  Image,
  Group,
  TextInput,
  Grid,
  Select,
  Divider,
  NumberInput,
  Stack,
  Card,
} from '@mantine/core';

export function CreateComponent() {
  return (
    <Form>
      {({ submit }) => (
        <Stack gap="xs" my="md" px="lg">
          <Stack gap="xs">
            <Group justify="space-between">
              <Text fw="500" size="sm">
                Thông tin sản phẩm
              </Text>
            </Group>
            <Field name="name" initialValue={''}>
              {({ value, setValue, onBlur }) => (
                <TextInput
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                  size="xs"
                  label="Tên sản phẩm"
                  required
                  aria-required
                />
              )}
            </Field>
            <Group grow>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <TextInput
                    aria-required
                    required
                    label="Đơn vị chính"
                    size="xs"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                  />
                )}
              </Field>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <TextInput
                    label="Đơn vị phụ"
                    size="xs"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                  />
                )}
              </Field>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <TextInput
                    label="Đơn vị mua hàng"
                    size="xs"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                  />
                )}
              </Field>
            </Group>
            <Group grow>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <Select
                    size="xs"
                    value={value}
                    label="Khách hàng"
                    data={['React', 'Angular', 'Vue', 'Svelte']}
                    onBlur={onBlur}
                  />
                )}
              </Field>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <Select
                    size="xs"
                    value={value}
                    label="Phân loại"
                    data={['React', 'Angular', 'Vue', 'Svelte']}
                    onBlur={onBlur}
                  />
                )}
              </Field>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <Select
                    size="xs"
                    value={value}
                    label="Mã nội bộ"
                    data={['React', 'Angular', 'Vue', 'Svelte']}
                    onBlur={onBlur}
                  />
                )}
              </Field>
            </Group>
          </Stack>
          <Divider my="xs" />

          <Stack gap="xs">
            <Group justify="space-between">
              <Text fw={500} size="sm">
                Thông số kỹ thuật
              </Text>
            </Group>
            <Group grow>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <TextInput
                    size="xs"
                    label="Chiều dài"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                  />
                )}
              </Field>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <TextInput
                    label="Chiều rộng"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                    size="xs"
                  />
                )}
              </Field>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <TextInput
                    label="Kích thước dán"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                    size="xs"
                  />
                )}
              </Field>
            </Group>
            <Group grow>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <TextInput
                    label="Số màu"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                    size="xs"
                  />
                )}
              </Field>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <TextInput
                    label="Kích thước dán"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                    size="xs"
                  />
                )}
              </Field>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <TextInput
                    label="Số màu"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                    size="xs"
                  />
                )}
              </Field>
            </Group>
            <Group grow></Group>
          </Stack>
          <Divider my="xs" />
          <Stack gap="xs">
            <Group justify="space-between">
              <Text fw={500} size="sm">
                Trục
              </Text>
            </Group>
            <Group grow>
              <Field name="name" initialValue="0">
                {({ value, setValue, onBlur }) => (
                  <NumberInput
                    label="Số cây trục trong bộ"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                    size="xs"
                  />
                )}
              </Field>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <TextInput
                    label="Qui cách trục"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                    size="xs"
                  />
                )}
              </Field>
              <Field name="name" initialValue={''}>
                {({ value, setValue, onBlur }) => (
                  <TextInput
                    label="Vị trí"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                    size="xs"
                  />
                )}
              </Field>
            </Group>
          </Stack>
          <Button mt="md">Hello</Button>
        </Stack>
      )}
    </Form>
  );
}
