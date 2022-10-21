import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import client, { IArticle, IArticleFields, IHome, IHomeFields } from '../contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Container, Row, Col, Card, CardTitle, CardText,Button } from 'reactstrap'


const Home = ({ home, articles }: { home: IHome, articles: IArticle[] }) => {
  useEffect(() => {
    console.log(articles)
  }, [articles])
  return (<>
    <Head>
      <title>{home.fields.title}</title>
    </Head>
    <main>

      <div
        className='text-center p-5 text-white'
        style={{
          background: `url("http:${home.fields.background?.fields.file.url}") no-repeat center`,
          minHeight: 1000
        }}>

        <h1 className='mt-5 '>{home.fields?.title}</h1>

        <div className='mb-5'>
          {documentToReactComponents(home?.fields?.description!)}
        </div>

        <Container>
          <Row>
            {articles.map((article) => {
              return (
                <Col sm={4} key={article.fields.slug}>
                  <Card className='pt-5 text-black-50'>
                    <CardTitle tag="h5">{article.fields.title}</CardTitle>
                    <CardText >{article.fields.description}</CardText>
                    <Link href={`/articles/${article.fields.slug}`}>
                      <Button>{article.fields.action}</Button>
                    </Link>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>

      </div>
    </main>
  </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const home = await client.getEntries<IHomeFields>({
    content_type: 'home',
    limit: 1
  })

  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: 'article',
    select: 'fields.title,fields.description,fields.slug,fields.action'
  })

  const [homePage] = home.items
  return {
    props: {
      title: 'My blog Syimyk Mitalipov',
      home: homePage,
      articles: articleEntries.items
    },
    revalidate: 3000
  }
}
