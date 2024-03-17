import { useState } from 'react'

import { EditForm, EditFormik } from '@/features/edit/components/edit-formik'
import { ContentEditor } from '@/features/edit/components/editor'
import { PostInfoModal } from '@/features/edit/components/post-info-modal'
import { usePublishPost } from '@/features/edit/hooks/use-mutations'
import { withAdmin } from '@/shared/HOC/with-admin'

const Editor = () => {
  const { mutate: publish } = usePublishPost()

  const [postInfoModalOpen, setIsPostInfoModalOpen] = useState(false)

  const onPostInfoModalOpen = () => setIsPostInfoModalOpen(true)
  const handleClose = () => setIsPostInfoModalOpen(false)

  return (
    <EditFormik onSubmit={(data) => publish(data)}>
      <EditForm>
        <PostInfoModal open={postInfoModalOpen} handleClose={handleClose} />
        <ContentEditor onPostInfoModalOpen={onPostInfoModalOpen} />
      </EditForm>
    </EditFormik>
  )
}

export default withAdmin(Editor)
