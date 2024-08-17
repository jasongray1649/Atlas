// app/[...missing].tsx
/**
 * 404 Not Found component.
 * Displayed when accessing non-existent routes.
 * Provides navigation options to return to valid app sections.
 */
import React from "react"

const NotFound: React.FC = () => {
	return (
		<div>
			<h1>404 - Page Not Found</h1>
			<p>The page you are looking for does not exist.</p>
		</div>
	)
}

export default NotFound
