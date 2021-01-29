import React from 'react'
import {TitleProps} from '../interface'

const Title: React.FC<TitleProps> = ({
 title,
 handleSort
}) => {
	return (
		<th className="fw6 bb b--black-20 pt3 pb3 pr3 tc" onClick={() => handleSort(title)}>
			<span className="flex items-center justify-center ttc">
				{title}
				<span className="material-icons">import_export</span>
			</span>
		</th>
	)
}

export default Title
