let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Github/nextproperty_frontend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +17 src/App.tsx
badd +1 src/Unauthorized.tsx
badd +4 src/Dashboard/NavBar/NavBarDash.tsx
badd +4 src/Dashboard/List/ListDash.tsx
badd +192 src/Dashboard/Edit/Edit.tsx
badd +4 src/Dashboard/Delete/Delete.tsx
badd +67 src/Dashboard/LogIn/LogIn.tsx
badd +12 ~/Documents/Github/nextproperty_frontend/src/Dashboard/Shared/ImageSelector.tsx
badd +20 ~/Documents/Github/nextproperty_frontend/src/Dashboard/Edit/Edit.css
argglobal
%argdel
edit src/Dashboard/Edit/Edit.tsx
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
exe 'vert 1resize ' . ((&columns * 124 + 124) / 249)
exe 'vert 2resize ' . ((&columns * 124 + 124) / 249)
argglobal
let s:l = 195 - ((58 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
195
normal! 070|
wincmd w
argglobal
if bufexists("~/Documents/Github/nextproperty_frontend/src/Dashboard/Edit/Edit.css") | buffer ~/Documents/Github/nextproperty_frontend/src/Dashboard/Edit/Edit.css | else | edit ~/Documents/Github/nextproperty_frontend/src/Dashboard/Edit/Edit.css | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/Github/nextproperty_frontend/src/Dashboard/Edit/Edit.css
endif
let s:l = 20 - ((19 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
20
normal! 016|
wincmd w
exe 'vert 1resize ' . ((&columns * 124 + 124) / 249)
exe 'vert 2resize ' . ((&columns * 124 + 124) / 249)
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
