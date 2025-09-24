import { ClipLoader } from 'react-spinners';
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className='w-full h-[90vh] flex flex-col items-center justify-center'>
            <ClipLoader
                // color={color}
                // loading={loading}
                // cssOverride={override}
                // size={150}
                // aria-label="Loading Spinner"
                // data-testid="loader"
            />
        </div>
    )
}

export default Loading;
