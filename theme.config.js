const YEAR = new Date().getFullYear()

export default {
  footer: (
    <small style={{ display: 'block', marginTop: '8rem' }}>
      <time>{YEAR}</time> © kakachao
      <a href="/feed.xml">RSS</a>
      <style jsx>{`
        a {
          float: right;
        }
      `}</style>
    </small>
  ),
  navs:[
    {
      url:'/',
      title:'首页'
    },
    {
      url:'/photos',
      title:'项目'
    },
    {
      url:'/posts',
      title:'博客'
    },
  ]
}