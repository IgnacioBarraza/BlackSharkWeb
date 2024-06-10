import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ToolsItem = ({ tool, onRemove }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded shadow mb-4">
        <div className="flex items-center">
        <FontAwesomeIcon icon={faImage} className="mr-4" size='2x'/>
            <span>{tool}</span>
        </div>
        <div className="flex items-center">
            <button onClick={onRemove} className="text-red-500">
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
  </div>
);
