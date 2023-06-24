

export default function Example() {

  return (
    <div className="min-w-full absolute z-20 top-0 flex justify-center ">
      <header className="min-w-full text-slate-100 max-h-16 absolute bg-gradient-to-br from-slate-900/75 to-slate-800/75 text-slate-100 ">
        <nav className="flex mx-auto max-w-7xl p-2 lg:px-8" aria-label="Global">
          <div className="flex mr-4">
            <a href="#" className="-m-1.5 p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38"><defs><linearGradient id="b" x1="87.629%" x2="9.97%" y1="28.473%" y2="86.882%"><stop offset="0%" stop-color="#0f172a" stop-opacity="0" /><stop offset="100%" stop-color="#F1F5F9" /></linearGradient><filter id="a" width="141.4%" height="141.4%" x="-20.7%" y="-20.7%" filterUnits="objectBoundingBox"><feGaussianBlur in="SourceGraphic" stdDeviation="2" /></filter></defs><g fill="none" fill-rule="nonzero"><path fill="#2e1065" d="M19 33.5c-8.008 0-14.5-6.492-14.5-14.5S10.992 4.5 19 4.5 33.5 10.992 33.5 19 27.008 33.5 19 33.5Zm0-5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z" filter="url(#a)" /><path fill="url(#b)" d="M19 33.5c-8.008 0-14.5-6.492-14.5-14.5S10.992 4.5 19 4.5 33.5 10.992 33.5 19 27.008 33.5 19 33.5Zm0-5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z" /></g></svg>
            </a>

          </div>
          <div className="flex items-center text-2xl font-semibold">
            <h1>Realtime HotMap</h1>
          </div>
        </nav>
      </header>
    </div>
  )
}
