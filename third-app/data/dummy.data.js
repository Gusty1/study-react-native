import Category from '../models/category'
import Meal from '../models/meal'

export const CATEGORIES = [
  new Category('c1', 'Italian', '#f5428d'),
  new Category('c2', 'Quick & Easy', '#f54242'),
  new Category('c3', 'Hamburgers', '#f5a442'),
  new Category('c4', 'German', '#f5d142'),
  new Category('c5', 'Light & Lovely', '#368dff'),
  new Category('c6', 'Exotic', '#41d95d'),
  new Category('c7', 'Breakfast', '#9eecff'),
  new Category('c8', 'Asian', '#b9ffb0'),
  new Category('c9', 'French', '#ffc7ff'),
  new Category('c10', 'Summer', '#47cfed'),
]

export const MEALS = [
  new Meal(
    'm1',
    ['c7'],
    'aaa',
    'bbb',
    'ccc',
    'https://truth.bahamut.com.tw/s01/201712/2d4a024324f62389be278d88caab8e43.JPG',
    10,
    ['xx', 'zz', 'yy'],
    ['do', 'go', 'yeah'],
    true,
    true,
    true,
    true
  ),
  new Meal(
    'm2',
    ['c1'],
    'aaa',
    'bbb',
    'ccc',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUQio5nWK6ww2HBjmSDiPL94jk72YWtUcGfv47i7BtT-w0MwFD4Rz1KgeJR1q4wEIKEo&usqp=CAU',
    20,
    ['xx', 'zz', 'yy'],
    ['do', 'go', 'yeah'],
    true,
    true,
    true,
    true
  ),
  new Meal(
    'm3',
    ['c2', 'c5', 'c10'],
    'aaa',
    'bbb',
    'ccc',
    'https://blog-imgs-89.fc2.com/a/t/e/atelier10colors/fc2blog_20151109120528d4d.jpg',
    30,
    ['xx', 'zz', 'yy'],
    ['do', 'go', 'yeah'],
    true,
    true,
    true,
    true
  ),
]
