import { useState, useEffect } from 'react';

function App() {
	const [isEduroam, setIsEduroam] = useState(false);

	useEffect(() => {
		async function checkNetwork() {
			const ip = await getPublicIP();
			console.log('Detected IP:', ip);
			setIsEduroam(isEduroamIP(ip));
		}
		checkNetwork();
	}, []);

	// Fetch Public IP
	async function getPublicIP() {
		try {
			const response = await fetch('https://api64.ipify.org?format=json');
			const data = await response.json();
			return data.ip;
		} catch (error) {
			console.error('Failed to fetch IP:', error);
			return null;
		}
	}

	// Check if the IP starts with '195.178.' (Eduroam network)
	function isEduroamIP(ip) {
		return ip && ip.startsWith('195.178.');
	}

	// Choose the correct Primula URL based on network
	const primulaUrl = isEduroam
		? 'https://mau.hr.evry.se/'
		: 'https://primula.mau.se:10443/';

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
				<h1 className="text-2xl font-bold text-center mb-4">
					Dynamic Links Based on Network
				</h1>
				<p className="text-center mb-6">
					Detected Network:{' '}
					<span className="font-semibold">
						{isEduroam ? 'Eduroam' : 'Other'}
					</span>
				</p>
				<div className="space-y-3">
					<a
						href={primulaUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
						Open Primula
					</a>
					<a
						href="https://canvas.mau.se/"
						target="_blank"
						rel="noopener noreferrer"
						className="block w-full text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
						Open Canvas
					</a>
					<a
						href="https://ids.mau.se/"
						target="_blank"
						rel="noopener noreferrer"
						className="block w-full text-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
						Open IDS
					</a>
				</div>
			</div>
		</div>
	);
}

export default App;
