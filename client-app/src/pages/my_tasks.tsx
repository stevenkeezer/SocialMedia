import App from "../app/Tasks"

export async function getStaticProps() {
  return { props: { isDark: true } };
}

export default function Example(props) {
  return (<App/>)
}