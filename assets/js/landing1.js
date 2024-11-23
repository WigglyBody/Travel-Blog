function showNavBar(){
    const navItems = document.querySelector('.navItems')
    const open_Bar = document.querySelector('.open_Bar')
    const close_Bar = document.querySelector('.close_Bar')
    
    navItems.style.display = 'flex'
    open_Bar.style.display = 'none'
    close_Bar.style.display = 'block'
}

function closeNavBar(){
    const navItems = document.querySelector('.navItems')
    const open_Bar = document.querySelector('.open_Bar')
    const close_Bar = document.querySelector('.close_Bar')
    
    navItems.style.display = 'none'
    open_Bar.style.display = 'block'
    close_Bar.style.display = 'none'
}