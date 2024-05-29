import { Button } from '@mui/material';
import axios from 'axios';
import { memo, useState } from 'react';

/**
 * DemoContent is a React component used to render a demo content on the page.
 * It renders a image on the page followed by a heading, some text and a footer.
 * It also renders a quote and some content about a person being transformed into a vermin.
 */
function DemoContent() {
	const [data, setData] = useState([]);

	const handlePROXYAPI = async() => {
		const response = await axios.get('api/v1');
		setData(response.data)
	}
	return (
		<div>
			<img
				src="assets/images/demo-content/morain-lake.jpg"
				alt="beach"
				style={{
					maxWidth: '640px',
					width: '100%'
				}}
				className="rounded-6"
			/>
			
			<button onClick={handlePROXYAPI} className='mt-5 w-50 p-10 bg-blue-800 text-white'> 
				API Test
			</button>

			<p>
				{data && data}
			</p>
		</div>
	);
}

export default memo(DemoContent);
