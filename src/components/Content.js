const Content = ({children, bgColor = '#fafafa'}) => {
    return (
        <div className='content' style={{backgroundColor: bgColor}}>
            {children}
        </div>
    )
}

export default Content;