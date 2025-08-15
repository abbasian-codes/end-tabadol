// components/Layout.js
import Header from "../../src/components/Header"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container mx-auto py-8">{children}</main>
    </>
  )
}
