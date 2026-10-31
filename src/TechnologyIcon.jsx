import {
  SiCplusplus, SiDatabricks, SiJavascript, SiLaravel, SiNodedotjs,
  SiPandas, SiPhp, SiPython, SiStreamlit,
} from 'react-icons/si'
import { FaAws, FaJava } from 'react-icons/fa6'
import { VscAzure } from 'react-icons/vsc'

// Monochrome SVG adaptation of Matplotlib's official polar-plot logo geometry:
// https://matplotlib.org/stable/gallery/misc/logos2.html
const polarPoint = (radius, angle) => [12 + radius * Math.cos(angle), 12 - radius * Math.sin(angle)]
const polarBars = [2, 6, 8, 7, 4, 5, 8].map((value, index) => {
  const radius = value * 10.5 / 9
  const angle = index * Math.PI * 2 / 7
  const width = [.4, .4, .6, .8, .2, .5, .3][index] * Math.PI / 4
  const start = polarPoint(radius, angle)
  const end = polarPoint(radius, angle + width)
  return `M12 12L${start.join(' ')}A${radius} ${radius} 0 0 0 ${end.join(' ')}Z`
})

function MatplotlibIcon({ size, className }) {
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <g stroke="currentColor" strokeWidth=".6" opacity=".3">
      {[3.5, 5.833, 8.167].map((radius) => <circle key={radius} cx="12" cy="12" r={radius}/>)}
      {[0, 1, 2, 3].map((index) => <path key={index} d={`M${polarPoint(10.5, index * Math.PI / 4).join(' ')}L${polarPoint(10.5, index * Math.PI / 4 + Math.PI).join(' ')}`}/>)}
    </g>
    <g fill="currentColor" stroke="currentColor" strokeWidth=".35" opacity=".8">{polarBars.map((path, index) => <path key={index} d={path}/>)}</g>
    <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth=".9"/>
  </svg>
}

const icons = {
  Databricks: SiDatabricks,
  AWS: FaAws,
  Azure: VscAzure,
  Python: SiPython,
  Pandas: SiPandas,
  Matplotlib: MatplotlibIcon,
  Streamlit: SiStreamlit,
  Laravel: SiLaravel,
  'Node.js': SiNodedotjs,
  PHP: SiPhp,
  JavaScript: SiJavascript,
  'C family': SiCplusplus,
  Java: FaJava,
}

export default function TechnologyIcon({ name, size = 20, className }) {
  const Icon = icons[name]
  return Icon ? <Icon size={size} className={className} aria-hidden="true" focusable="false"/> : null
}
