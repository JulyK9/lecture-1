import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

import './index.css'
import BasicTemplates from '../../templates/BasicTemplates'
import CodeBlock from '../../components/markdown/CodeBlock'

function ViewPage(props) {
	const {id} = useParams()
	const [article, setArticle] = useState(false)

	const getArticle = () => {
		axios.get('http://localhost:3001/articles/' + id)
			.then((success) => {
				console.log(success.data)
				setArticle(success.data)
			})
	}

	useEffect(() => {
		getArticle()
	}, [])

	return article
		? (
			<BasicTemplates>
				<div className={'ViewPage'}>
					<h1 className={'ViewPage__title'}>
						{article.title}
					</h1>
					<img className={'ViewPage__image'} src={article.image}/>
					<div className={'ViewPage__content'}>
						<ReactMarkdown
							source={article.content}
							renderers={{code: CodeBlock}}/>
					</div>
				</div>
			</BasicTemplates>
		)
		: (<h1>loading...</h1>)
}

export default ViewPage
