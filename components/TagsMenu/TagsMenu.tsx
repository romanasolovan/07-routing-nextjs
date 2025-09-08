import React from 'react'
import css from './TagsMenu.module.css'
import Link from 'next/link';


const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
  return (
    <div className={css.menuContainer}>
  <button className={css.menuButton}>
    Notes ▾
  </button>
    <ul className={css.menuList}>
        {tags.map((item) => (
            <li className={css.menuItem} key={item}>
            <Link href={`/notes/filter/${item}`}
              className={css.menuLink}>
              {item}
            </Link>
            </li>))}
    </ul>
</div>

  )
}
