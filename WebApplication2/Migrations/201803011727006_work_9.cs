namespace WebApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class work_9 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sample", "ReceiveDate", c => c.DateTime());
            AddColumn("dbo.Sample", "ConclusionTime", c => c.Int());
            AddColumn("dbo.Sample", "Conclusion", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Sample", "Conclusion");
            DropColumn("dbo.Sample", "ConclusionTime");
            DropColumn("dbo.Sample", "ReceiveDate");
        }
    }
}
