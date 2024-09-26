import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';
import { toAbsoluteUrl } from '../../helpers';
import { CreateWorkspaceModal } from '../../partials';

import { useEffect, useState } from 'react';

const CreateWorkspace = () => {

  const [showCreateModal, setShowCreateModal] = useState<boolean>(true)

  return (

    <CreateWorkspaceModal show={showCreateModal} handleClose={() => setShowCreateModal(true)} />

  );
}

export default CreateWorkspace;