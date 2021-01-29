import {Link} from 'react-router-dom'
import Button from './Button'
import {HeaderProps} from '../interface'

const Header: React.FC<HeaderProps> = ({noOfSelected, handleDelete}) => {
	return (
		<div className="flex items-center justify-center pa4 bg-lightest-blue navy">
			<p className="b flex-auto">{noOfSelected} selected</p>
			<Link to="/add" className="no-underline">
				<Button className="bg-green white mh1" icon="add">
					ADD NEW
				</Button>
			</Link>
			<Button
				className="bg-gray white mh1"
				icon="delete"
				disabled={!noOfSelected}
				onClick={handleDelete}
				data-testid="delete-button"
			>
				DELETE
			</Button>
		</div>
	)
}

export default Header
