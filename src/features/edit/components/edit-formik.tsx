import React from 'react'

import { Form, Formik, useFormikContext as useBaseFormikContext } from 'formik'
import * as Yup from 'yup'

import { useBeforeunload } from '@/shared/hooks/use-beforeunload'

export enum ValueKeys {
  '種類' = 'category',
  '標示ID' = 'id',
  '標題' = 'title',
  '內容' = 'content',
  '封面' = 'coverImage',
  'isReadme' = 'isReadme'
}

export type FormValues = Omit<Record<ValueKeys, string>, 'isReadme'> & {
  isReadme: boolean
}

type BaseFormikProps = React.ComponentProps<typeof Formik<FormValues>>

type FormProps = {
  initialValues?: FormValues
  children: BaseFormikProps['children']
  onSubmit: BaseFormikProps['onSubmit']
}

const defaultValues: FormValues = {
  id: '',
  category: '',
  title: '',
  content: '',
  coverImage: '',
  isReadme: false
}

export const EditFormik = ({
  initialValues,
  onSubmit,
  ...props
}: FormProps) => {
  return (
    <Formik
      {...props}
      initialValues={{ ...defaultValues, ...initialValues }}
      onSubmit={onSubmit}
      validationSchema={Yup.object({
        [ValueKeys['標示ID']]: Yup.string()
          .trim()
          .required('標示ID為必填欄位!'),
        [ValueKeys['標題']]: Yup.string().trim().required('標題為必填欄位!'),
        [ValueKeys['種類']]: Yup.string().trim().required('種類為必填欄位!'),
        [ValueKeys['封面']]: Yup.string()
          .trim()
          .required('封面為必填欄位!')
          .matches(
            /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})/,
            '請輸入有效網址'
          ),
        [ValueKeys['內容']]: Yup.string().trim().required('內容為必填欄位!')
      })}
    />
  )
}

export const useFormikContext = () => useBaseFormikContext<FormValues>()

export const EditForm = (props: React.ComponentProps<typeof Form>) => {
  const { dirty } = useFormikContext()
  useBeforeunload({ disabled: !dirty })
  return <Form {...props} />
}
