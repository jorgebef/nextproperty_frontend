let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Github/nextproperty_frontend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +66 src/SharedGlobal/helperFuncs/crud.helpers.ts
badd +75 src/Dashboard/Shared/MapSelector/MapSelector.tsx
badd +6 src/Frontend/NavBar/NavBarFront.tsx
badd +6 src/Frontend/Home/HomePage.tsx
badd +161 src/Dashboard/Create/CreateProperty.tsx
badd +27 src/Dashboard/List/ListDash.tsx
badd +38 src/Dashboard/Shared/ImageSelector/ImageSelector.tsx
badd +60 src/Dashboard/LogIn/LogInDash.tsx
badd +105 src/Dashboard/Shared/styleDash.module.css
badd +186 src/Dashboard/Edit/EditProperty.tsx
badd +28 src/Dashboard/Delete/DeleteProperty.tsx
badd +36 src/Dashboard/NavBar/NavBarDash.tsx
argglobal
%argdel
edit src/Dashboard/NavBar/NavBarDash.tsx
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
wincmd =
argglobal
let s:l = 30 - ((1 * winheight(0) + 33) / 66)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
30
normal! 010|
wincmd w
argglobal
if bufexists("src/Dashboard/Shared/styleDash.module.css") | buffer src/Dashboard/Shared/styleDash.module.css | else | edit src/Dashboard/Shared/styleDash.module.css | endif
if &buftype ==# 'terminal'
  silent file src/Dashboard/Shared/styleDash.module.css
endif
let s:l = 75 - ((38 * winheight(0) + 33) / 66)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
75
normal! 043|
wincmd w
wincmd =
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
