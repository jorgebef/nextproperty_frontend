let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Github/nextproperty_frontend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +11 src/App.tsx
badd +9 src/components/Navbar.component.tsx
badd +13 src/components/LogIn.component.tsx
badd +17 src/components/Create.component.tsx
badd +15 src/components/List.component.tsx
badd +40 src/components/Edit.component.tsx
badd +35 src/helpers/crud.helpers.ts
badd +1 ~/Documents/Github/nextproperty_frontend/src/components/Delete.component.tsx
argglobal
%argdel
edit src/helpers/crud.helpers.ts
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
exe 'vert 1resize ' . ((&columns * 122 + 124) / 249)
exe 'vert 2resize ' . ((&columns * 126 + 124) / 249)
argglobal
let s:l = 44 - ((43 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
44
normal! 02|
wincmd w
argglobal
if bufexists("~/Documents/Github/nextproperty_frontend/src/components/Delete.component.tsx") | buffer ~/Documents/Github/nextproperty_frontend/src/components/Delete.component.tsx | else | edit ~/Documents/Github/nextproperty_frontend/src/components/Delete.component.tsx | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/Github/nextproperty_frontend/src/components/Delete.component.tsx
endif
let s:l = 10 - ((9 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
10
normal! 0
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 122 + 124) / 249)
exe 'vert 2resize ' . ((&columns * 126 + 124) / 249)
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
