import { createPartner } from '@/apis/partner';
import { NewPartner } from '@/types/partner';
import { Button, Checkbox, Group, Stack, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { Field, Form } from 'houseform';
import { useQueryClient } from '@tanstack/react-query';

interface PartnerCreateProps {
  closeModalCallback: () => void;
}
export function PartnerCreate(props: PartnerCreateProps) {
  const { closeModalCallback } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: NewPartner) => createPartner(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      closeModalCallback();
    },
  });

  return (
    <Form onSubmit={(values: NewPartner) => mutation.mutate(values)}>
      {({ submit }) => (
        <Stack>
          <Field name="name" initialValue={''}>
            {({ value, setValue, onBlur }) => (
              <TextInput
                label="Tên"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
              />
            )}
          </Field>
          <Group>
            <Field name="isCustomer" initialValue={true}>
              {({ value, setValue, onBlur }) => (
                <Checkbox
                  label="Khách hàng"
                  checked={value}
                  onChange={(e) => setValue(e.target.checked)}
                  onBlur={onBlur}
                />
              )}
            </Field>
            <Field name="isSupplier" initialValue={false}>
              {({ value, setValue, onBlur }) => (
                <Checkbox
                  label="Nhà cung cấp"
                  checked={value}
                  onChange={(e) => setValue(e.target.checked)}
                  onBlur={onBlur}
                />
              )}
            </Field>
          </Group>
          <Field name="email" initialValue={''}>
            {({ value, setValue, onBlur }) => (
              <TextInput
                label="Email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
              />
            )}
          </Field>
          <Field name="phone" initialValue={''}>
            {({ value, setValue, onBlur }) => (
              <TextInput
                label="Số điện thoại"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
              />
            )}
          </Field>
          <Field name="address" initialValue={''}>
            {({ value, setValue, onBlur }) => (
              <TextInput
                label="Địa chỉ"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
              />
            )}
          </Field>

          <Button onClick={submit}>Submit</Button>
        </Stack>
      )}
    </Form>
  );
}
