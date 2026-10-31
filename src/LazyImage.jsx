import { useEffect, useRef, useState } from 'react'

export default function LazyImage({ src, srcSet, loading = 'lazy', decoding = 'async', ...props }) {
  const imageRef = useRef(null)
  const [hasEntered, setHasEntered] = useState(loading === 'eager')
  const shouldLoad = hasEntered || loading === 'eager'

  useEffect(() => {
    if (hasEntered) return
    if (loading === 'eager' || typeof IntersectionObserver === 'undefined') {
      setHasEntered(true)
      return
    }

    const element = imageRef.current
    if (!element) return
    let active = true
    const observer = new IntersectionObserver((entries) => {
      if (active && entries.some((entry) => entry.isIntersecting)) {
        setHasEntered(true)
        observer.disconnect()
      }
    }, { rootMargin: '200px 0px', threshold: 0 })
    observer.observe(element)
    return () => {
      active = false
      observer.disconnect()
    }
  }, [hasEntered, loading])

  // Keep sources attached after the first intersection, including when src
  // changes. Inactive carousel slides remain unmounted by their parent.
  return <img {...props} ref={imageRef} loading={loading} decoding={decoding}
    srcSet={shouldLoad && srcSet ? srcSet : undefined}
    src={shouldLoad && src ? src : undefined}/>
}
