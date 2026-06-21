import { useNavigate } from 'react-router-dom'
import Friends from '../components/Friends'

export default function MyPeople() {
  const navigate = useNavigate()

  return (
    <div id="wrapper" className="divided">
      <section className="wrapper style1 align-center">
        <div className="inner">
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9em',
              color: '#888',
              textDecoration: 'underline',
              marginBottom: '1.5rem',
              display: 'inline-block',
            }}
          >
            ← Back to Main
          </button>
          <h2>My People</h2>
          <p>
            The beautiful souls who colour my world — friends who&apos;ve walked
            alongside me through every season of life.
          </p>
        </div>
      </section>
      <Friends />
    </div>
  )
}
