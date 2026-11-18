import Seo from '../components/Seo'
import PageHero from '../components/Hero'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" noindex />
      <PageHero eyebrow="404" title="Page not found" intro="Sorry, we couldn’t find that page.">
        <div className="flex flex-wrap gap-3">
          <Button to="/" size="lg">
            Back to home
          </Button>
          <Button to="/contact" variant="ghost" size="lg">
            Contact us
          </Button>
        </div>
      </PageHero>
    </>
  )
}
