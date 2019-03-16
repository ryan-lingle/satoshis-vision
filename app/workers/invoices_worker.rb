class InvoicesWorker
  include Sidekiq::Worker

  def perform(args)
    start_time = Time.now
    puts 'subscribed!!'
    si = args["settle_index"] || 15
    request = Lnrpc::InvoiceSubscription.new(settle_index: si)
    LnService.grpc_client.subscribe_invoices(request) do |invoice|
      si = invoice.settle_index
      puts.invoice.payment_request
      if invoice.payment_request == args["payment_request"]
        Word.push_edits(args["edits"])
        ActionCable.server.broadcast(
          "invoices",
          payment_request: invoice.payment_request,
          words: Word.all.order(position: :asc)
        )
        return
      end
      return if check_time(start_time)
    end
  rescue Exception => e
    puts e.message
    args.merge!(settle_index: si)
    perform(args)
  end

  def check_time(start_time)
    ((Time.now - start_time) / 60) > 5
  end
end
