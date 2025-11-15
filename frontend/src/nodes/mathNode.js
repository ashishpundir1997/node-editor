import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const MathNode = ({ id, data }) => {
	return (
		<BaseNode
			id={id}
			data={data}
			title="Math"
			fields={[
				{ key: 'operation', label: 'Operation', type: 'select', options: [ { value: 'add' }, { value: 'subtract' }, { value: 'multiply' }, { value: 'divide' } ], defaultValue: data?.operation || 'add' },
				{ key: 'a', label: 'A', type: 'number', defaultValue: data?.a || 0 },
				{ key: 'b', label: 'B', type: 'number', defaultValue: data?.b || 0 }
			]}
			handles={[
				{ type: 'source', position: Position.Right, id: `${id}-result` }
			]}
		/>
	);
};

