import { memo } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import FileUpload from '../../DndFile';
const BankFile = ({ id, data }) => {
    const { updateNodeData } = useReactFlow();

    return (
        <div className="p-4 bg-white border rounded shadow">
            <div className="font-bold">Bank PDF</div>
            <FileUpload/>
            <input
                type="text"
                value={data.text}
                onChange={(e) => updateNodeData(id, { run: false, text: e.target.value, done: true })}
                className="border p-1 mt-2 w-full"
            />
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default memo(BankFile);
