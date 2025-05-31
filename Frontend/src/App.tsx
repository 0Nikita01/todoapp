import styles from './styles/App.module.scss'
import ToDoList from './components/ToDoList/ToDoList'
import BgBlock from './components/BgBlock'

function App() {
	return (
		<>
			<div className={styles.container}>
				<ToDoList />
			</div>
			<BgBlock />
		</> 
	)
}

export default App
