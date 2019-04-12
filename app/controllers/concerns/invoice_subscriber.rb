class InvoiceSubscriber
  include Concurrent::Async

  def subscribe(args)
    start_time = args[:start_time] || Time.now
    si = args[:settle_index] || 49
    LnService.subscribe_invoices(settle_index: si) do |invoice|
      si = invoice.settle_index
      if invoice.payment_request == args[:payment_request]
        puts 'payment received'
        Word.push_edits(args[:edits])
        ActionCable.server.broadcast(
          "invoices",
          payment_request: invoice.payment_request,
          words: Word.all.order(id: :asc)
        )
        return
      end
      return if check_time(start_time)
    end
  rescue Exception => e
    puts e.message
    args.merge!({ settle_index: si, start_time: start_time })
    perform(args)
  end

  def check_time(start_time)
    check = ((Time.now - start_time) / 60) > 5
    check
  end
end
