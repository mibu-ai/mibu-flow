import { memo } from 'react';
import { Handle, Position} from '@xyflow/react';
const SaveTxt = ({ id, data }) => {

    return (
        <div className="p-4 bg-gray-100 border rounded shadow">
            <div className="font-bold">Save TXT</div>
            <Handle id="b" type="target" position={Position.Left} style={{ top: '50%', transform: 'translateY(-50%)' }}/>
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default memo(SaveTxt);