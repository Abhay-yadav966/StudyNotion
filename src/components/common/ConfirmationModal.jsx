import React from 'react'

const ConfirmationModal = ({modalData}) => {
  return (
    <div>
        <div>
            <h2>{modalData.heading}</h2>
            <p>{modalData.subHeading}</p>
            <div>
                {/* created a generic button */}
                <IconBtn
                    text={modalData?.btn1Text}
                    onclick={modalData?.btn1Handler} 
                />
                <button onClick={modalData?.btn2Handler} >
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal;