import { connectDB } from '@/lib/mongodb';

export async function GET() {
	try {
		const uri = process.env.MONGODB_URI;

		// First check if URI exists
		const debugInfo = {
			hasUri: !!uri,
			uriLength: uri?.length || 0,
			uriStart: uri?.substring(0, 50) || 'NOT FOUND',
			allEnvKeys: Object.keys(process.env).filter((k) => k.includes('MONGO')),
		};

		console.log('Debug Info:', debugInfo);

		// If no URI found, return debug info
		if (!uri) {
			return Response.json(
				{
					success: false,
					message: 'MONGODB_URI not found in environment',
					debug: debugInfo,
				},
				{ status: 500 }
			);
		}

		// Try to connect
		await connectDB();

		return Response.json({
			success: true,
			message: 'Connected to MongoDB!',
			debug: debugInfo,
		});
	} catch (error) {
		console.error('Connection test failed:', error);
		return Response.json(
			{
				success: false,
				message: error.message,
				code: error.code,
				name: error.name,
			},
			{ status: 500 }
		);
	}
}
