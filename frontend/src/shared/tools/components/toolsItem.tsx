import { faBan, faCheck, faImage, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useProps } from '../../../hooks/useProps';
import { useState } from 'react';
import { UpdateEquipment } from '../../../utils/interfaces';

export const ToolsItem = ({ tool, onRemove, onUpdate }) => {
    const { userType, userToken } = useProps();

    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(tool.nombre_equipo);
    const [editToolType, setEditToolType] = useState(tool.tipo_eqiupo)

    const saveUpdate = async () => {
      const updatedTool: UpdateEquipment = {
        nombre_equipo: editName ?? tool.nombre_equipo,
        tipo_equipo: editToolType ?? tool.tipo_equipo
      }
      onUpdate(tool.id_equipo, updatedTool);
      setIsEditing(prev => !prev);
    }

    const cancelUpdate = () => {
      setIsEditing(prev => !prev);
      setEditName(tool.nombre_equipo);
    }

    return (
        <>
            <div className="flex items-center justify-between p-4 bg-white rounded shadow mb-4">
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faImage} className="mr-4" size='2x'/>
                    {isEditing ? (
                        <input value={editName} onChange={(event) => setEditName(event.target.value)} className="border-2 border-black w-fit" />
                    ) : (
                        <span>{tool.nombre_equipo}</span>
                    )}
                </div>
                {userType === "admin" &&  userToken && (
                    <div className="flex items-center gap-x-2">
                    {isEditing ? (
                        <>
                            <button onClick={saveUpdate}>
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button onClick={cancelUpdate}>
                                <FontAwesomeIcon icon={faBan} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(prev => !prev)}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button onClick={onRemove} className="text-red-500">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </>
                    )}
                </div>
                )}
            </div>
        </>
    );
};
