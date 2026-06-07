
        /* --- PORTAL DASHBOARD SCREEN --- */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Dashboard Header Bar */}
          <div className="glass-card p-6 rounded-xl border border-brand-slateAccent mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-lg">
                {portalState.user.avatar}
              </div>
              <div>
                <h2 className="text-base font-bold text-white font-display">{portalState.user.name}</h2>
                <p className="text-xs text-slate-400">{portalState.user.company} &bull; <span className="text-slate-500">Partner since {portalState.user.joinedDate}</span></p>
              </div>
            </div>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center space-x-1 px-4 py-2 border border-red-500/20 text-red-400 hover:bg-red-500/5 text-xs font-semibold rounded-md transition-colors"
            >
              <LogOut size={12} />
              <span>Exit Portal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-2">
              {[
                { id: 'projects', label: 'Active Projects', icon: <FileText size={14} /> },
                { id: 'invoices', label: 'Invoices & Receipts', icon: <FileText size={14} /> },
                { id: 'tickets', label: 'Support Tickets', icon: <MessageSquare size={14} /> },
                { id: 'files', label: 'Shared Vault Files', icon: <FileUp size={14} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-2.5 px-4 py-3 rounded-md text-xs font-semibold transition-all text-left ${
                    activeTab === tab.id
                      ? 'bg-brand-primary/10 border-l-2 border-brand-primary text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Main Workspace Frame */}
            <div className="lg:col-span-9 glass-card p-6 sm:p-8 rounded-xl min-h-[400px]">
              
              {/* --- ACTIVE PROJECTS TAB --- */}
              {activeTab === 'projects' && (
                <div className="space-y-8">
                  {portalState.projects.map((proj) => (
                    <div key={proj.id} className="space-y-6">
                      <div className="flex justify-between items-start border-b border-brand-slateAccent/40 pb-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded border border-brand-primary/10">
                            {proj.status}
                          </span>
                          <h3 className="text-lg font-bold text-white font-display mt-2">{proj.name}</h3>
                          <p className="text-xs text-slate-400 leading-relaxed mt-1">{proj.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-white tracking-tight">{proj.completeness}%</span>
                          <span className="text-[10px] text-slate-500 block">Milestone Completion</span>
                        </div>
                      </div>

                      {/* Milestones stepper board */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Milestone Roadmap Checklist</h4>
                        <div className="relative border-l border-brand-slateAccent pl-5 space-y-6">
                          {proj.milestones.map((m, i) => (
                            <div key={i} className="relative">
                              <span className={`absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-brand-darker flex items-center justify-center ${
                                m.status === 'completed' ? 'border-brand-primary bg-brand-primary/20' : 
                                m.status === 'current' ? 'border-brand-accent animate-pulse' : 'border-slate-700'
                              }`} />
                              <div>
                                <h5 className={`text-xs font-bold ${m.status === 'completed' ? 'text-slate-400' : 'text-white'}`}>{m.title}</h5>
                                <p className="text-[10px] text-slate-500 mt-0.5">{m.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

              {/* --- INVOICES TAB --- */}
              {activeTab === 'invoices' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-white font-display">Invoices & Financial Records</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-brand-slateAccent/40 text-[10px] text-slate-500 uppercase tracking-widest">
                          <th className="pb-3">Invoice ID</th>
                          <th className="pb-3">Project / Sprint</th>
                          <th className="pb-3">Amount</th>
                          <th className="pb-3">Due Date</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-slateAccent/20 text-xs">
                        {portalState.invoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 font-semibold text-white">{inv.id}</td>
                            <td className="py-4 text-slate-400">{inv.project}</td>
                            <td className="py-4 text-white font-medium">{inv.amount}</td>
                            <td className="py-4 text-slate-400">{inv.date}</td>
                            <td className="py-4">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                inv.status === 'Paid' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              }`}>
                                {inv.status}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <button
                                onClick={() => setInvoicePreview(inv)}
                                className="inline-flex items-center space-x-1 text-brand-primary hover:text-white transition-colors"
                              >
                                <Download size={12} />
                                <span>Preview</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- SUPPORT TICKETS TAB --- */}
              {activeTab === 'tickets' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-brand-slateAccent/40 pb-4">
                    <h3 className="text-base font-bold text-white font-display">Lodged Support Tickets</h3>
                    <button
                      onClick={() => setShowNewTicketModal(true)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-brand-primary text-white text-xs font-semibold rounded-md shadow-premium hover:shadow-glow transition-all"
                    >
                      <Plus size={12} />
                      <span>New Ticket</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {portalState.supportTickets.map((tck) => (
                      <div key={tck.id} className="p-4 bg-brand-slateAccent/20 border border-brand-slateAccent/40 rounded-lg">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-white font-display">{tck.subject}</span>
                            <span className="text-[10px] text-slate-500">({tck.id})</span>
                          </div>
                          <div className="flex gap-2">
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                              tck.urgency === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-slate-700/50 text-slate-400'
                            }`}>
                              {tck.urgency} Urgency
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                              tck.status === 'Resolved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                            }`}>
                              {tck.status}
                            </span>
                          </div>
                        </div>

                        {/* Message log feed */}
                        <div className="space-y-3 bg-brand-darker/60 rounded border border-brand-slateAccent/30 p-3 mt-3">
                          {tck.messages.map((msg, mIdx) => (
                            <div key={mIdx} className="space-y-1">
                              <div className="flex justify-between text-[9px] text-slate-500">
                                <span className="font-semibold text-slate-300">{msg.sender === 'client' ? 'Alex Rivera (Client)' : 'Nextora Support'}</span>
                                <span>{msg.time}</span>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed">{msg.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- VAULT SHARED FILES TAB --- */}
              {activeTab === 'files' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-white font-display">Shared File Vault</h3>
                  <p className="text-xs text-slate-500">Repository for wireframes, legal agreements, and scope lists.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {portalState.files.map((file, i) => (
                      <div key={i} className="p-4 bg-brand-slateAccent/20 hover:bg-brand-slateAccent/30 border border-brand-slateAccent/40 rounded-lg flex items-center justify-between gap-4 transition-colors">
                        <div>
                          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block">{file.category}</span>
                          <span className="text-xs font-semibold text-white mt-1 block leading-tight">{file.name}</span>
                          <span className="text-[10px] text-slate-500 mt-1 block">{file.size} &bull; Uploaded {file.date}</span>
                        </div>
                        <button
                          onClick={() => alert(`Simulating file download: ${file.name}`)}
                          className="p-2 bg-brand-darker hover:bg-white/5 border border-brand-slateAccent text-slate-400 hover:text-white rounded-full transition-colors flex-shrink-0"
                          title="Download File"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* --- INVOICE RECEIPT MODAL OVERLAY --- */}
      <AnimatePresence>
        {invoicePreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInvoicePreview(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-brand-darker border border-brand-slateAccent p-6 sm:p-8 rounded-xl z-10 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-brand-slateAccent pb-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Receipt Preview</h3>
                  <span className="text-[10px] text-slate-500">Nextora Invoice System</span>
                </div>
                <button
                  onClick={() => setInvoicePreview(null)}
                  className="p-1 border border-brand-slateAccent text-slate-500 hover:text-white rounded-full transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Receipt Visual Sheet */}
              <div className="bg-slate-950 p-6 rounded-lg border border-brand-slateAccent/60 space-y-4 font-mono text-[10px] text-slate-400">
                <div className="flex justify-between">
                  <span>VENDOR:</span>
                  <span className="text-white">NEXTORA STUDIO INC.</span>
                </div>
                <div className="flex justify-between">
                  <span>BILL TO:</span>
                  <span className="text-white">APEX RETAIL INT.</span>
                </div>
                <div className="flex justify-between">
                  <span>INVOICE NO:</span>
                  <span className="text-white">{invoicePreview.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>ISSUED DATE:</span>
                  <span className="text-white">{invoicePreview.date}</span>
                </div>
                <hr className="border-slate-800" />
                <div className="flex justify-between font-bold text-white">
                  <span>DESCRIPTION</span>
                  <span>TOTAL AMOUNT</span>
                </div>
                <div className="flex justify-between">
                  <span>{invoicePreview.project}</span>
                  <span>{invoicePreview.amount}</span>
                </div>
                <hr className="border-slate-800" />
                <div className="flex justify-between font-bold text-white">
                  <span>STATUS:</span>
                  <span className={invoicePreview.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'}>
                    {invoicePreview.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setInvoicePreview(null)}
                  className="w-1/2 py-2.5 bg-brand-slateAccent/40 hover:bg-brand-slateAccent border border-brand-slateAccent text-white text-xs font-semibold rounded-md transition-colors"
                >
                  Close Receipt
                </button>
                <button
                  onClick={() => alert('Receipt PDF downloaded successfully.')}
                  className="w-1/2 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-md shadow-premium hover:shadow-glow transition-all"
                >
                  Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- NEW TICKET SUBMISSION MODAL --- */}
      <AnimatePresence>
        {showNewTicketModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewTicketModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-brand-darker border border-brand-slateAccent p-6 sm:p-8 rounded-xl z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-brand-slateAccent pb-3 mb-5">
                <h3 className="text-sm font-bold text-white font-display">Lodge Support Ticket</h3>
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="p-1 border border-brand-slateAccent text-slate-500 hover:text-white rounded-full transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Ticket Subject</label>
                  <input
                    type="text"
                    required
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="e.g., Apple Pay layout button overlaps"
                    className="glass-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Category</label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value }))}
                      className="glass-input"
                    >
                      <option>UI Bug</option>
                      <option>Billing Feature</option>
                      <option>SLA Request</option>
                      <option>Server Operations</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Urgency</label>
                    <select
                      value={newTicket.urgency}
                      onChange={(e) => setNewTicket(prev => ({ ...prev, urgency: e.target.value }))}
                      className="glass-input"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    value={newTicket.message}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Detail the bug or engineering request here..."
                    className="glass-input resize-none"
                  />
                </div>

                <div className="pt-2 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowNewTicketModal(false)}
                    className="w-1/2 py-2.5 bg-brand-slateAccent/40 border border-brand-slateAccent text-white text-xs font-semibold rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-md shadow-premium hover:shadow-glow transition-all"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
