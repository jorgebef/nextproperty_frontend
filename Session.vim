let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Github/nextproperty_frontend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +47 src/App.tsx
badd +6 src/helpers/crud.helpers.ts
badd +29 src/helpers/auth.helpers.ts
badd +11 src/components/dashboard/Create.tsx
badd +16 src/helpers/types_variables.ts
badd +53 src/components/dashboard/ListDash.tsx
badd +5 ~/Documents/Github/nextproperty_frontend/src/components/dashboard/styles/login.css
argglobal
%argdel
edit ~/Documents/Github/nextproperty_frontend/src/components/dashboard/styles/login.css
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
let s:l = 5 - ((4 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
5
normal! 015|
wincmd w
argglobal
if bufexists("src/helpers/types_variables.ts") | buffer src/helpers/types_variables.ts | else | edit src/helpers/types_variables.ts | endif
if &buftype ==# 'terminal'
  silent file src/helpers/types_variables.ts
endif
let s:l = 16 - ((15 * winheight(0) + 34) / 69)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
16
normal! 0
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
