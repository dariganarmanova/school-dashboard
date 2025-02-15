import './PageStyle.css'

function HomePage() {
    return (
        <div className='intro'>
            <h1>Welcome to the AcedIt! School Dashboard.</h1>
            <p>What services do we offer?</p>
            <ul>
                <li>
                    Registration and authentication as a teacher or student
                </li>
                <li>Course view for each semester</li>
                <li>Teachers can post courses</li>
                <li>Grade view and progress view</li>
                <li>Students and teachers can create tasks and set a deadline</li>
            </ul>
        </div>
    )
}
export default HomePage;