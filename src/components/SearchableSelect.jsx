import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Check, X } from 'lucide-react';

const SearchableSelect = ({
  options = [],
  selectedValue = '',
  onChange,
  placeholder = 'None / Unassigned (Global Candidate Pool)',
  themeColor = 'purple' // 'purple' | 'blue'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Reset search query when dropdown opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.id === selectedValue);

  const filteredOptions = options.filter(opt => {
    const query = searchQuery.toLowerCase();
    return (
      opt.title?.toLowerCase().includes(query) ||
      opt.company?.toLowerCase().includes(query) ||
      opt.id?.toLowerCase().includes(query)
    );
  });

  const isPurple = themeColor === 'purple';
  
  // Theme styling helpers
  const focusRingClass = isPurple 
    ? 'focus-within:ring-2 focus-within:ring-brand-purple/20' 
    : 'focus-within:ring-2 focus-within:ring-brand-blue/20';

  const activeBorderClass = isOpen
    ? (isPurple ? 'border-brand-purple' : 'border-brand-blue')
    : 'border-gray-200';

  const hoverOptionBgClass = isPurple
    ? 'hover:bg-brand-purple/5'
    : 'hover:bg-brand-blue/5';

  const activeOptionTextClass = isPurple
    ? 'text-brand-purple font-bold'
    : 'text-brand-blue font-bold';

  const searchInputFocusClass = isPurple
    ? 'focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple'
    : 'focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue';

  return (
    <div ref={wrapperRef} className="relative w-full text-xs">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2.5 bg-gray-50 border ${activeBorderClass} rounded-xl font-semibold text-gray-700 focus:outline-none focus:bg-white flex items-center justify-between transition-all cursor-pointer text-left ${focusRingClass}`}
      >
        <span className="truncate pr-4">
          {selectedOption ? (
            <>
              <span className="text-gray-900 font-bold">{selectedOption.title}</span>
              <span className="text-gray-500 font-normal"> ({selectedOption.company})</span>
              <span className="text-gray-400 font-mono text-[10px] ml-1.5 font-normal bg-gray-200 px-1.5 py-0.5 rounded border border-gray-300">{selectedOption.id}</span>
            </>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[300px]"
          >
            {/* Search Input Area */}
            <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by job title, company, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-8 pr-8 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:outline-none transition-all ${searchInputFocusClass}`}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Options List */}
            <div className="overflow-y-auto flex-1 py-1 max-h-[220px] divide-y divide-gray-50">
              {/* "None / Unassigned" option */}
              {!searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onChange('');
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left transition-all flex items-center justify-between ${hoverOptionBgClass} ${!selectedValue ? activeOptionTextClass : 'text-gray-600'}`}
                >
                  <span className="truncate">{placeholder}</span>
                  {!selectedValue && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                </button>
              )}

              {/* Filtered Option Items */}
              {filteredOptions.length > 0 ? (
                filteredOptions.map((jd) => {
                  const isSelected = selectedValue === jd.id;
                  return (
                    <button
                      key={jd.id}
                      type="button"
                      onClick={() => {
                        onChange(jd.id);
                        setIsOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left transition-all flex items-center justify-between gap-3 ${hoverOptionBgClass} ${isSelected ? activeOptionTextClass : 'text-gray-700'}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold truncate">{jd.title}</div>
                        <div className="text-[10px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                          <span className="truncate font-medium">{jd.company}</span>
                          <span>•</span>
                          <span className="font-mono text-gray-400 bg-gray-100 px-1 py-0.2 rounded border border-gray-200">{jd.id}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-gray-400 text-xs font-medium">
                  No matching job descriptions found.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchableSelect;
