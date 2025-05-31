import { useState } from 'react';
import './style.scss';


function BgBlock() {
    const [count] = useState<Number>(75);

   
    return (
        <div className={'bg'}>
            {
                [...Array(count)].map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`dotWrapper ${'dotWrapper-' + (idx + 1)}`}
                    >
                        <div 
                            className={`dot ${'dot-' + (idx + 1)}`}
                        >
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default BgBlock;