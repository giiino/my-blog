import { useState } from 'react'

import { Stack } from '@mui/material'
import { useRouter } from 'next/router'

import { EditForm, EditFormik } from '@/features/edit/components/edit-formik'
import { ContentEditor } from '@/features/edit/components/editor'
import { PostInfoModal } from '@/features/edit/components/post-info-modal'
import { useUpdatePost } from '@/features/edit/hooks/use-mutations'
import { useEditorData } from '@/features/edit/hooks/use-queries'
import { withAdminPage } from '@/shared/HOC/with-admin-check'
import { PageLoading } from '@/shared/components/loading/page-loading'

const Editor = () => {
  const { query } = useRouter()
  const id = String(query.id)
  const { data: editValues, isLoading } = useEditorData(
    query.id as string | undefined
  )
  const { mutate: update } = useUpdatePost()

  const [postInfoModalOpen, setIsPostInfoModalOpen] = useState(false)

  const onPostInfoModalOpen = () => setIsPostInfoModalOpen(true)
  const handleClose = () => setIsPostInfoModalOpen(false)

  if (isLoading) return <PageLoading open={isLoading} />

  return (
    <EditFormik
      initialValues={{ ...editValues!, id }}
      onSubmit={(data) => update(data)}
    >
      <EditForm>
        <Stack>
          <PostInfoModal
            isForUpdate
            open={postInfoModalOpen}
            handleClose={handleClose}
          />
          <ContentEditor onPostInfoModalOpen={onPostInfoModalOpen} />
        </Stack>
      </EditForm>
    </EditFormik>
  )
}

export default withAdminPage(Editor)
